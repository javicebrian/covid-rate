import dayData from "./dayData";

export default interface Country {
    Country: string,
    Slug: string,
    ISO2: string,
    data?: Array<dayData>
}