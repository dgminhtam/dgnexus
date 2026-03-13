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
                    title: "Trade",
                    url: "/settings/trade",
                },
                {
                    title: "Chiến lược",
                    url: "/strategies",
                },
                {
                    title: "Promts",
                    url: "/promts",
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
