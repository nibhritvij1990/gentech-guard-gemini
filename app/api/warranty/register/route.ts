import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { google } from "googleapis";

// Initialize Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // Use Service Role Key for backend
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize Google Sheets
// Initialize Google Sheets
const getSheetsClient = async () => {
    const email = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (!email || !privateKey || !sheetId) return null;

    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: email,
            private_key: privateKey,
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const client = await auth.getClient();

    return {
        client: google.sheets({ version: 'v4', auth: client as any }),
        sheetId
    };
};

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const plainData: Record<string, string> = {};
        const files: Record<string, File> = {};

        for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
                files[key] = value;
            } else {
                plainData[key] = value.toString();
            }
        }

        // 1. Upload Files to Supabase Storage
        let vehicleImageUrl = "";
        let rcImageUrl = "";

        const uploadFile = async (file: File, path: string) => {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const { data, error } = await supabase.storage
                .from('warranty-uploads')
                .upload(path, buffer, {
                    contentType: file.type,
                    upsert: true
                });

            if (error) throw error;

            const { data: publicUrlData } = supabase.storage
                .from('warranty-uploads')
                .getPublicUrl(path);

            return publicUrlData.publicUrl;
        };

        if (files.vehicleImage) {
            const ext = files.vehicleImage.name.split('.').pop();
            const filename = `vehicle-${Date.now()}.${ext}`;
            vehicleImageUrl = await uploadFile(files.vehicleImage, filename);
        }

        if (files.rcImage) {
            const ext = files.rcImage.name.split('.').pop();
            const filename = `rc-${Date.now()}.${ext}`;
            rcImageUrl = await uploadFile(files.rcImage, filename);
        }

        // 2. Insert into Supabase Database
        const dbRecord = {
            name: plainData.name,
            phone: plainData.phone,
            email: plainData.email,
            reg_number: plainData.regNumber,
            chassis_number: plainData.chassisNumber,
            ppf_roll: plainData.ppfRoll,
            ppf_category: plainData.ppfCategory,
            dealer_name: plainData.dealerName,
            installer_mobile: plainData.installerMobile,
            installation_location: plainData.installationLocation,
            message: plainData.message,
            vehicle_image_url: vehicleImageUrl,
            rc_image_url: rcImageUrl,
            created_at: new Date().toISOString(),
        };

        const { error: dbError } = await supabase
            .from('warranty_registrations')
            .insert([dbRecord]);

        if (dbError) throw dbError;

        // 3. Append to Google Sheets
        const sheetsConfig = await getSheetsClient();
        if (sheetsConfig) {
            try {
                const { client, sheetId } = sheetsConfig;
                await client.spreadsheets.values.append({
                    spreadsheetId: sheetId,
                    range: 'Sheet1!A:N', // Adjust range as needed
                    valueInputOption: 'USER_ENTERED',
                    requestBody: {
                        values: [[
                            dbRecord.name,
                            dbRecord.phone,
                            dbRecord.email,
                            dbRecord.reg_number,
                            dbRecord.chassis_number,
                            dbRecord.ppf_roll,
                            dbRecord.ppf_category,
                            dbRecord.dealer_name,
                            dbRecord.installer_mobile,
                            dbRecord.installation_location,
                            dbRecord.message,
                            dbRecord.vehicle_image_url,
                            dbRecord.rc_image_url,
                            dbRecord.created_at
                        ]]
                    }
                });
            } catch (sheetError) {
                console.error("Google Sheets Error:", sheetError);
                // Don't fail the request if sheets fails, just log it.
            }
        }

        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error("Registration Error:", error);
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
