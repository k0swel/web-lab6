
const lunchsObject = [
    {
        id: 0,
        iconPath: "icons/combo/soup.png",
        name: "Суп"
    },
    {
        id: 1,
        iconPath: "icons/combo/main.png",
        name: "Главное блюдо"
    },
    {
        id: 2,
        iconPath: "icons/combo/salad.png",
        name: "Салат",
    },
    {
        id: 3,
        iconPath: "icons/combo/drink.png",
        name: "Напиток"
    },
    {
        id: 4,
        iconPath: "icons/combo/desert.png",
        name: "Десерт",
        span: "(Можно добавить к любому заказу)"
    }
];

export const lunchs = [
    [lunchsObject[0], lunchsObject[1], lunchsObject[2], lunchsObject[3]],
    [lunchsObject[0], lunchsObject[1], lunchsObject[3]],
    [lunchsObject[0], lunchsObject[2], lunchsObject[3]],
    [lunchsObject[1], lunchsObject[2], lunchsObject[3]],
    [lunchsObject[1], lunchsObject[3]],
    [lunchsObject[4]]
];