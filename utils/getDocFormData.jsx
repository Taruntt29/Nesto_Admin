export const getDocFormData = docs => {
  console.log('docs-->>', docs);
  let i = 0;
  const formData = new FormData();

  for (i = 0; i < docs?.length; i++) formData?.append('documents', docs?.[i]);
  return formData;
};
