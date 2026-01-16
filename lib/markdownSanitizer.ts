import {defaultSchema} from "rehype-sanitize";

export const markdownSchema = {
    ...defaultSchema,
    tagNames: [
        ...(defaultSchema.tagNames ?? []),
        "iframe",
    ],
    attributes: {
        ...defaultSchema.attributes,
        "iframe": [
            "src",
            "width",
            "height",
            "allow",
            "allowFullScreen",
            "referrerPolicy",
            "loading",
            "title",
        ]
    }
}