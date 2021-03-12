const vanillaFn = (notes) => {
  const grouped = {};

  notes.forEach((note) => {
    const {
      author: { id: currentId },
      content,
      section,
    } = note;

    if (!grouped[section]) grouped[section] = { len: 0, data: {} };

    grouped[section].len += 1;

    if (!grouped[section].data[currentId])
      grouped[section].data[currentId] = { contents: [], heading: "", id: "" };

    const userNotes = grouped[section].data[currentId];
    if (!userNotes.heading) userNotes.heading = "placeholder";
    if (!userNotes.id) userNotes.id = currentId;
    userNotes.contents.push(content);
  });

  Object.keys(grouped).forEach((sectionId) => {
    grouped[sectionId].data = Object.values(grouped[sectionId].data);
  });

  return grouped;
};

module.exports = vanillaFn;
