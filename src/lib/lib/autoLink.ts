type Keyword = {
  word: string;
  url: string;
};

export function autoLinkContent(content: string, keywords: Keyword[]) {
  let result = content;

  keywords.forEach((k) => {
    const regex = new RegExp(`(${k.word})`, "gi");

    result = result.replace(
      regex,
      `<a href="${k.url}" class="text-green-600 font-semibold underline">$1</a>`
    );
  });

  return result;
}