"use client"

import { useState, useTransition, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { SystemPrompt } from '@/app/lib/definitions';

interface PromptManagerClientProps {
    prompts: SystemPrompt[];
    onSave: (id: string, content: string) => Promise<any>;
}

export function PromptManagerClient({ prompts, onSave }: PromptManagerClientProps) {
    const [selectedPromptId, setSelectedPromptId] = useState<string>(prompts[0]?.id || '');
    const [editContent, setEditContent] = useState<string>('');
    const [isPending, startTransition] = useTransition();
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const prompt = prompts.find(p => p.id === selectedPromptId);
        if (prompt) {
            setEditContent(prompt.content);
        } else {
            setEditContent('');
        }
        setIsSuccess(false);
    }, [selectedPromptId, prompts]);

    const selectedPrompt = prompts.find(p => p.id === selectedPromptId);

    const handleSave = () => {
        if (!selectedPromptId) return;

        startTransition(async () => {
            try {
                await onSave(selectedPromptId, editContent);
                setIsSuccess(true);
                setTimeout(() => setIsSuccess(false), 3000);
            } catch (error) {
                console.error("Failed to save", error);
                alert("Có lỗi xảy ra khi lưu.");
            }
        });
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Chỉnh sửa Prompt</CardTitle>
                <CardDescription>
                    {selectedPrompt?.description || 'Chọn một prompt từ danh sách để xem và chỉnh sửa.'}
                    {selectedPrompt?.updated_at && (
                        <span className="block mt-1 text-xs text-muted-foreground">
                            Cập nhật lần cuối: {new Date(selectedPrompt.updated_at).toLocaleString('vi-VN')}
                        </span>
                    )}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {prompts.length > 0 ? (
                    <>
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Lựa chọn Template
                            </label>
                            <Select
                                value={selectedPromptId}
                                onValueChange={(value) => setSelectedPromptId(value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Chọn một prompt..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {prompts.map((prompt) => (
                                        <SelectItem key={prompt.id} value={prompt.id}>
                                            {prompt.id}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Nội dung Prompt
                            </label>
                            <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                disabled={isPending}
                                className="flex min-h-[400px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                    </>
                ) : (
                    <div className="text-center py-4 text-muted-foreground">
                        Không có prompt nào trong hệ thống.
                    </div>
                )}
            </CardContent>
            {prompts.length > 0 && (
                <CardFooter className="flex justify-end">
                    <Button
                        onClick={handleSave}
                        disabled={isPending || editContent === selectedPrompt?.content}
                    >
                        {isPending ? 'Đang lưu...' : isSuccess ? 'Đã lưu thành công!' : 'Lưu thay đổi'}
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
}
