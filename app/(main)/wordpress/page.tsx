import { getMessageTemplates, updateMessageTemplate } from '@/app/api/action';
import { PromptManagerClient } from '@/components/prompt-manager-client';

export const dynamic = "force-dynamic";

export const metadata = {
    title: 'Quản lý Template WordPress',
    description: 'Quản lý các message templates cho WordPress',
};

export default async function WordPressTemplatesPage() {
    const templates = await getMessageTemplates();
    const wpTemplates = (templates || []).filter(t => t.id.startsWith('TPL_WP_'));

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h1 className="text-lg font-semibold md:text-2xl">Quản lý Template WordPress</h1>
            </div>
            <div className="mt-4">
                <PromptManagerClient prompts={wpTemplates} onSave={updateMessageTemplate} />
            </div>
        </div>
    );
}
