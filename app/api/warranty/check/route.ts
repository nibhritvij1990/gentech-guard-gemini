import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get("q");

        if (!query) {
            return NextResponse.json({ error: "Query parameter 'q' is required" }, { status: 400 });
        }

        // Clean the query slightly (remove spaces if searching for phone, etc, or keep raw)
        // For simplicity, we search raw and maybe some variations if needed.
        // We will strip spaces for normalization maybe? Let's stick to raw for now as user input might vary.

        const { data, error } = await supabase
            .from('warranty_registrations')
            .select('*')
            .or(`phone.eq.${query},reg_number.eq.${query},chassis_number.eq.${query},reg_number.eq.${query.toUpperCase()}`) // minimal case insensitivity for reg
            .limit(1);

        if (error) throw error;

        return NextResponse.json(data);

    } catch (error: any) {
        console.error("Check Error:", error);
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
