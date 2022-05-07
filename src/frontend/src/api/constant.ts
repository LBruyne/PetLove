import names from './names.json'
import {ActionType} from "../../../declarations/PetLove/PetLove.did";

const reducerOperation = {
    login: 0,
    getUserProfile: 1,
    setMarket: 2,
    updatePet: 3
}
const eventType = {
    buy: 0,
    sell: 1,
    abandon: 2
}
const eventTitle = {
    0: 'Confirm Purchase',
    1: 'Confirm Selling',
    2: 'Confirm Abandon'
}
const petInteraction = {
    play: {'play': null},
    feed: {'feed': null}
}
const happinessIncrement = {
    play: BigInt(5),
    feed: BigInt(10)
}
const happinessToLevel = (num: bigint, adult: string = 'Adult') => {
    let tp = Number(num / BigInt(5))
    if (!tp)
        return 'New Born'
    else if (tp < 5)
        return 'Baby'
    else if (tp < 10)
        return 'Kid'
    else if (tp < 15)
        return 'Adolescent'
    else if (tp < 20)
        return adult
    else
        return 'Senior'
}

const UTC2Date = (timeStamp: string) => {
    return new Date(Number(timeStamp) / 1000000);
}

const getRandomName = () => {
    return names.data[Math.floor(Math.random() * (names.data.length + 1))];
}
const principal2string = (principal) => {
    if (principal === '')
        return ''
    else return principal.toText()
}

const contractPet2Local = (onePet) => {
    return {
        ...onePet,
        birthday: UTC2Date(onePet.createTime),
        level: happinessToLevel(onePet.happiness),
        owner: [principal2string(onePet.owner[0]), principal2string(onePet.owner[1])],
        name: getRandomName()
    }
}
const host = '127.0.0.1:8000'
const getTitleAndContent = (e) => {
    if (e.event.hasOwnProperty('buy')) return ["A request to purchase from Mate", `Hi, your mate ${e.sender.toText()} has requested to adopt a pet ${e.tokenId} with you!`, eventType.buy]
    else if (e.event.hasOwnProperty('abandon')) return ['A request to abandon from Mate', `Ooooops, your mate requested to abandon your pet!`, eventType.abandon]
    else if (e.event.hasOwnProperty('sell')) return ['A request to sell from Mate', `Hey, your mate just applied to sell your pet`, eventType.sell]
}
const contractEvent2local = (eventArray) => {
    return eventArray.map((ele, index) => {
        let tp = getTitleAndContent(ele)
        return {
            event: {
                title: tp[0],
                content: tp[1],
                time: new Date(),

            },
            key: index,
            type: tp[2],
            eventId: ele.requestId
        }
    })
}
export {
    reducerOperation,
    petInteraction,
    happinessToLevel,
    UTC2Date,
    getRandomName,
    contractPet2Local,
    host,
    contractEvent2local,
    eventType,
    eventTitle,
    happinessIncrement
};