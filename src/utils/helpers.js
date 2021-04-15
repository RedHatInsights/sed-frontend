export const pluralize = (count, str, fallback) =>
  count > 1 ? fallback || str + 's' : str;

export const downloadFile = (
  data,
  filename = `${new Date().toISOString()}`
) => {
  const type = 'data:text/plain;charset=utf-8,';
  const blob = new Blob([data], { type });
  const link = document.createElement('a');
  link.setAttribute('href', URL.createObjectURL(blob));
  link.setAttribute('download', `${filename}.yml`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
