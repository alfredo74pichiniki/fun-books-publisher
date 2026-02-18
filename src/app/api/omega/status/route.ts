
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Prevenir caché estático en build
export const dynamic = 'force-dynamic';

// Safe Initialization
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key';

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
    try {
        // 1. Fetch recent logs from Omega
        // (Asumimos que la tabla omega_decision_logs se llenará pronto)
        // Por ahora, simulamos estado si no hay datos.

        // const { data: logs, error } = await supabase
        //   .from('omega_decision_logs')
        //   .select('*')
        //   .order('created_at', { ascending: false })
        //   .limit(5);

        // Mock response para Fase 2/3 inicial
        const omegaStatus = {
            system_status: "ONLINE",
            orchestrator_mode: "AUTONOMOUS",
            last_heartbeat: new Date().toISOString(),
            brains: {
                analytical: { status: "ADVISORY_MODE", active_campaigns: 12, warnings: 1 },
                creative: { status: "ACTIVE", next_post: "14:00 PM", platform: "Pinterest" },
                retention: { status: "ACTIVE", cycles_today: 43 }
            },
            protocols: {
                profit_shield: "ARMED",
                panic_push: "ARMED"
            },
            recent_activity: [
                { time: "10:45 AM", type: "PROTOCOL", message: "Profit Shield checked 12 campaigns. 0 Kill Orders." },
                { time: "10:30 AM", type: "CREATIVE", message: "Pinterest Post deployed to VDS." },
                { time: "10:15 AM", type: "RETENTION", message: "Sent 5 Review Request emails." }
            ]
        };

        return NextResponse.json(omegaStatus);

    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch Omega status' }, { status: 500 });
    }
}
