import { Button } from "antd";
import React from "react";
import { utils, writeFile } from "xlsx";

export const DownloadReport = ({data, name, ...props}) => {
  const handleDownload = () => {
    const headings = [Object.keys(data[0])];
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);

    utils.sheet_add_json(ws, data, { origin: "A2", skipHeader: true });
    utils.book_append_sheet(wb, ws, "Udlavite");
    writeFile(wb, "Udlavite.xlsx");
  };

  return <Button onClick={handleDownload} {...props}>{name}</Button>;
};
