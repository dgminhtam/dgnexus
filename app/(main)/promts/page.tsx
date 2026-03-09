import { getSystemPrompts } from '@/app/api/action';
import { PromptManagerClient } from '@/components/prompt-manager-client';

export const metadata = {
    title: 'Quản lý Template Prompt',
    description: 'Quản lý các system prompts cho hệ thống AI',
};
export const dynamic = "force-dynamic";
export default async function TemplatesPage() {
    const prompts = await getSystemPrompts();

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Quản lý Template Prompt</h2>
            </div>
            <div className="mt-4">
                <PromptManagerClient prompts={prompts || []} />
            </div>
        </div>
    );
}
