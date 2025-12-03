const texts = ["kita", "atik", "tika", "aku", "kia", "makan", "kua"];

const groupAnagram = (arr) => {
  let grouped = {};

  const countAlphabets = (text) => {
    let anagram = new Array(26).fill(0);
    for (const alp of text) {
      const alpIndex = alp.charCodeAt() - "a".charCodeAt();
      anagram[alpIndex] += 1;
    }
    return anagram.join(",");
  };

  for (const item of arr) {
    const idx = countAlphabets(item);
    const temp = [...(grouped[idx] ?? []), item];
    grouped = { ...grouped, [idx]: temp };
  }

  return Object.values(grouped);
};

console.log(groupAnagram(texts));
