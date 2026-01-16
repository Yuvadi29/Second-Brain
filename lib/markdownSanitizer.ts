import { defaultSchema } from "hast-util-sanitize";

export const markdownSchema = {
  ...defaultSchema,

  tagNames: [
    ...(defaultSchema.tagNames ?? []),
    "img",
    "iframe",
  ],

  attributes: {
    ...defaultSchema.attributes,

    img: [
      "src",
      "alt",
      "title",
      "width",
      "height",
      "loading",
    ],

    iframe: [
      "src",
      "allow",
      "allowfullscreen",
      "frameborder",
      "referrerpolicy",
    ],
  },
};
