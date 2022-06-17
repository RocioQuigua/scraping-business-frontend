export const formatterDate = (date) => {
  let formatDate = new Date(date);
  formatDate = `${formatDate.getUTCDate()}/${formatDate.getUTCMonth() + 1}/${formatDate.getUTCFullYear()}`;
  return formatDate;
};