export function removeElementsAfterIndex(arr: any[], index: number) {
  if (index < arr.length - 1) {
    arr.splice(index + 1);
  }
  return arr;
}

export function removeElementsFromIndex(arr: any[], index: number) {
  if (index < arr.length) {
    arr.splice(index);
  }
  return arr;
}

export const wrapSourcesInAnchorTags = (sources: string[]): string[] => {
  return sources.map(
    (source) =>
      `<a href="${source.replace(
        'rtdocs',
        'https:/'
      )}" target="_blank" class="source-link"><div class="well">${source.replace(
        'rtdocs',
        'https:/'
      )}</div></a>`
  );
};

export const removeSources = (text: string): string => {
  return text.replace(/(sources:)[\s\S]*/i, '').trim();
};

export const extractSources = (text: string): string[] | null => {
  const lowerCaseText = text.toLowerCase();
  const sourcesKeyword = 'sources:';
  const sourcesIndex = lowerCaseText.indexOf(sourcesKeyword);

  if (sourcesIndex === -1) {
    return null;
  }

  const sourcesText = text.substring(sourcesIndex + sourcesKeyword.length);
  return sourcesText.split(/,|\n-/).map((source) => source.trim());
};