// read
export async function fetchAllData({
  type,
  page,
  pageNum,
}: {
  type: string;
  page: number;
  pageNum: number;
}) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL + type}?page=${page}&size=${pageNum}`,
  );

  if (!response.ok)
    throw new Error(`${type}의 정보를 불러오는데 실패했습니다.`);

  const data = await response.json();

  console.log(data);

  return data;
}

export async function fetchData(type: string, id: string) {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}${type}/${id}`);

  if (!response.ok)
    throw new Error(`${type}의 정보를 불러오는데 실패했습니다.`);

  const data = await response.json();

  return data;
}
