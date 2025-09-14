import _ from "lodash";

export function paginate (items, pageNumber, pageSize) {
    // to paginate the data, you need to calculate the starting index of the items on the page.
    const startIndex = (pageNumber - 1) * pageSize;
return _(items)
.slice(startIndex)
.take(pageSize)
.value();
}