import { BookOpen, GalleryVerticalEnd, Settings2, SquareTerminal } from "lucide-react"

export const siteConfig = {
    teams: [
        {
            name: "DGNexus",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
    ],
    navMain: [
        {
            title: "Thống kê",
            url: "#",
            icon: SquareTerminal,
            items: [
                {
                    title: "Tổng quan",
                    url: "/",
                }
            ],
        },
        {
            title: "Cấu hình",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "Template",
                    url: "/templates",
                },
                {
                    title: "Wordpress",
                    url: "/wordpress",
                },
                {
                    title: "Telegram",
                    url: "/telegram",
                },
            ],
        },
    ],
}
