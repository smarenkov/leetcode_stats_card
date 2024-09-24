import { Gradient } from "../elements";
import { Item } from "../item";
import { Extension } from "../types";

function abbreviateNumber(value: number): string {
    if (value >= 1_000_000) {
        return (value / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    } else if (value >= 1_000) {
        return (value / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return value.toString();
}

export function ComunityExtension(): Extension {
    return async function Comunity(generator, data, body) {
        if (generator.config.height < 400) {
            generator.config.height = 285;
        }

        const community = data.profile.community;
        console.log(community);

        const extension = new Item("g", {
            id: "ext-comunity",
            style: { transform: `translate(0px, 200px)` },
            children: [
                new Item("line", {
                    attr: { x1: 10, y1: 0, x2: generator.config.width - 10, y2: 0 },
                    style: { stroke: "var(--bg-1)", "stroke-width": 1 },
                }),
                new Item("text", {
                    content: "Comunity Stats",
                    id: "ext-comunity-title",
                    style: {
                        transform: `translate(20px, 20px)`,
                        fill: "var(--text-0)",
                        opacity: generator.config.animation !== false ? 0 : 1,
                        animation:
                            generator.config.animation !== false
                                ? "fade_in 1 0.3s 1.7s forwards"
                                : "",
                    },
                }),
                new Item("defs", {
                    children: [
                        Gradient("ext-comunity-mask-gradient", {
                            0: "#fff",
                            0.85: "#fff",
                            1: "#000",
                        }),
                        new Item("mask", {
                            id: "ext-comunity-mask",
                            children: [
                                new Item("rect", {
                                    style: {
                                        fill: "url(#ext-comunity-mask-gradient)",
                                        width: `${generator.config.width - 225 - 20}px`,
                                        height: "24px",
                                        transform: "translate(0, -14px)",
                                    },
                                }),
                            ],
                        }),
                        new Item("clipPath", {
                            id: "ext-comunity-clip",
                            children: [
                                new Item("rect", {
                                    style: {
                                        width: `${generator.config.width - 225 - 20}px`,
                                        height: "24px",
                                        transform: "translate(0, -14px)",
                                    },
                                }),
                            ],
                        }),
                    ],
                }),
            ],
        });

        extension.children?.push(
            new Item("g", {
                id: `ext-comunity-views`,
                style: {
                    transform: `translate(0px, ${1 * 12 + 30}px)`,
                    animation:
                        generator.config.animation !== false
                            ? `fade_in 0.3s ease ${(1.8 + 0.1 * 1).toFixed(2)}s 1 backwards`
                            : "",
                },
                children: [
                    new Item("text", {
                        content: `Views ${abbreviateNumber(community.postViewCount)}`,
                        style: {
                            transform: `translate(20px, 0)`,
                            fill: "var(--text-0)",
                            "alignment-baseline": "middle",
                            "font-size": "14px",
                        },
                    }),
                    new Item("text", {
                        content: `Solution ${abbreviateNumber(community.solutionCount)}`,
                        style: {
                            transform: `translate(130px, 0)`,
                            fill: "var(--text-0)",
                            "alignment-baseline": "middle",
                            "font-size": "14px",
                        },
                    }),
                    new Item("text", {
                        content: `Discuss ${abbreviateNumber(community.categoryDiscussCount)}`,
                        style: {
                            transform: `translate(260px, 0)`,
                            fill: "var(--text-0)",
                            "alignment-baseline": "middle",
                            "font-size": "14px",
                        },
                    }),
                    new Item("text", {
                        content: `Reputation ${abbreviateNumber(community.reputation)}`,
                        style: {
                            transform: `translate(370px, 0)`,
                            fill: "var(--text-0)",
                            "alignment-baseline": "middle",
                            "font-size": "14px",
                        },
                    }),
                ],
            }),
            new Item("g", {
                id: `ext-comunity-views-last-week`,
                style: {
                    transform: `translate(0px, ${2 * 12 + 30 + 4}px)`,
                    animation:
                        generator.config.animation !== false
                            ? `fade_in 0.3s ease ${(1.8 + 0.1 * 2).toFixed(2)}s 1 backwards`
                            : "",
                },
                children: [
                    new Item("text", {
                        content: `Last week + ${abbreviateNumber(community.postViewCountDiff)}`,
                        style: {
                            transform: `translate(20px, 0)`,
                            fill: "var(--text-0)",
                            "alignment-baseline": "middle",
                            "font-size": "12px",
                        },
                    }),
                    new Item("text", {
                        content: `Last week + ${abbreviateNumber(community.solutionCountDiff)}`,
                        style: {
                            transform: `translate(130px, 0)`,
                            fill: "var(--text-0)",
                            "alignment-baseline": "middle",
                            "font-size": "12px",
                        },
                    }),
                    new Item("text", {
                        content: `Last week + ${abbreviateNumber(community.categoryDiscussCountDiff)}`,
                        style: {
                            transform: `translate(260px, 0)`,
                            fill: "var(--text-0)",
                            "alignment-baseline": "middle",
                            "font-size": "12px",
                        },
                    }),
                    new Item("text", {
                        content: `Last week + ${abbreviateNumber(community.reputationDiff)}`,
                        style: {
                            transform: `translate(370px, 0)`,
                            fill: "var(--text-0)",
                            "alignment-baseline": "middle",
                            "font-size": "12px",
                        },
                    }),
                ],
            }),
        );

        body["ext-comunity"] = () => extension;
    };
}
