'use client';

import { CheckCircle, XCircle, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
    id: string;
    type: ToastType;
    message: string;
}

export function ToastContainer({ toasts }: { toasts: Toast[] }) {
    return (
        <div className="fixed top-4 right-4 z-[9999] space-y-2">
            {toasts.map(toast => (
                <div
                    key={toast.id}
                    className={`px-6 py-4 rounded-lg shadow-lg backdrop-blur-md border flex items-center gap-3 animate-slide-in ${
                        toast.type === 'success'
                            ? 'bg-green-500/90 border-green-400 text-white'
                            : toast.type === 'error'
                            ? 'bg-red-500/90 border-red-400 text-white'
                            : 'bg-blue-500/90 border-blue-400 text-white'
                    }`}
                >
                    {toast.type === 'success' && <CheckCircle className="w-5 h-5" />}
                    {toast.type === 'error' && <XCircle className="w-5 h-5" />}
                    {toast.type === 'info' && <Info className="w-5 h-5" />}
                    <p className="font-medium">{toast.message}</p>
                </div>
            ))}
        </div>
    );
}
