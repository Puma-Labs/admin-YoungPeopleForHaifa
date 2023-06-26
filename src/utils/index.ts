import { $public } from '../http';

export function getStatus(status: string) {
    return status === "show" ? "Active" : "Archive";
}

export function getUrl({
    status,
    page,
    search,
    order,
}: {
    status: string[];
    page: number;
    search: string;
    order?: number;
}) {
    let url = "";
    if (typeof status !== "undefined") {
        url = "?status=" + status.join(",");
    }
    if (typeof page !== "undefined") url += `&page=${page}`;
    if (search) url += `&search=${search}`;
    if (order) url += `&order=${order}`;
    console.log(url);
    return url;
}

export function getImageURL(image: File | string) {
    if (typeof image === "string" && image.includes("base64")) {
        return image;
    }
    if (typeof image === "string") {
        return $public(image);
    }
    return URL.createObjectURL(image);
}

export function getBase64Image(img: HTMLImageElement | null) {
  if (img) {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL("image/jpeg", 0.8);
  
    return dataURL
  }
}



