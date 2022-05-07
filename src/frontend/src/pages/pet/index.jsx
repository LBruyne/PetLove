import React, {useContext, useEffect, useState} from 'react';

import './index.scss';
import {Image, message, Progress, Skeleton} from "antd";
import {BookOutlined, DropboxOutlined, FileTextOutlined, HeartFilled, OrderedListOutlined} from "@ant-design/icons";
import {formatDate, formatDatetime, formatPrincipal} from "../../utils/fstring";
import {randomJazzicon} from "../../utils/random";
import Jazzicon from 'react-jazzicon';
import appContext from "../../api/context";
import {getPetProfile, interactWithPet} from "../../api/backendApi";
import {
    contractPet2Local,
    happinessIncrement,
    happinessToLevel,
    petInteraction,
    reducerOperation
} from "../../api/constant";

const testData = {
    name: 'Cat',
    mood: 80,
    level: 5,
    happiness: 70,
    imageUrl: 'https://bafybeiercnchpy27fencjvkw5rzxwfvzooknkpyci3mn7plo4q6xuu5asy.ipfs.dweb.link/17.png',
    birthday: new Date(),
    adoptday: new Date(),

    principle: 'kaj4a-3w34z-nxejl-cbj7e-24gh6-vl55e-3uyvh-2qyvh',
    matePrincipal: '6tkdx-45lmt-qxwub-hec46-xbccz-qhscu-dn3ut',
}

const PetPage = () => {
    const context = useContext(appContext)
    const pet = context.state.pet ? context.state.pet : context.state.defaultPet

    async function onFeed() {
        if (context.state.login) {
            let feedResult = await interactWithPet(context.state.backendActor, context.state.pet.id, petInteraction.feed)
            console.log(feedResult)
            if (feedResult) {
                await message.success('You have fed your pet, making it happier', 3);
                context.dispatch({
                    type: reducerOperation.updatePet,
                    pet: {
                        ...context.state.pet,
                        happiness: context.state.pet.happiness + happinessIncrement.feed,
                        level:happinessToLevel(context.state.pet.happiness + happinessIncrement.feed)
                    }
                })
            } else {
                await message.error('Failed to feed pet, please contact the administrator', 3)
            }
        } else {
            await message.error("Please login first!", 3)
        }
    }

    async function onPlay() {
        if (context.state.login) {
            let playResult = await interactWithPet(context.state.backendActor, context.state.pet.id, petInteraction.play)
            console.log(playResult)
            if (playResult) {
                {
                    await message.success('You have played with your pet, making it happier', 3);
                    context.dispatch({
                        type: reducerOperation.updatePet,
                        pet: {
                            ...context.state.pet,
                            happiness: context.state.pet.happiness + happinessIncrement.play,
                            level:happinessToLevel(context.state.pet.happiness + happinessIncrement.play)
                        }
                    })
                }
            } else {
                await message.error('Failed to pad pet, please contact the administrator', 3)
            }
        } else {
            await message.error('Please login first!', 3)
        }
    }

    return (
        <div className='outer'>
            <div className='pet-container'>
                <div className='row'>
                    <div className='item basic-info'>
                        <div className='name'>{testData.name}</div>
                        <div className='attr'>
                            <div className='key'>Gender</div>
                            <div className='value'>♀ Girl</div>
                        </div>
                        <div className='attr'>
                            <div className='key'>Type</div>
                            <div className='value'>Cat</div>
                        </div>
                        <div className='attr'>
                            <div className='key'>Mood</div>
                            <div className='value'>
                                {happinessToLevel(pet.happiness)}
                                <Progress
                                    strokeColor='#EA580B'
                                    style={{marginLeft: '10px'}}
                                    percent={pet.happiness}
                                    format={percent => `${percent} / 100`}
                                />
                            </div>
                        </div>
                        <div className='attr'>
                            <div className='key'>Level</div>
                            <div className='value'>
                                Lv.{testData.level}
                                <Progress
                                    strokeColor='#EA580B'
                                    style={{marginLeft: '10px'}}
                                    percent={testData.happiness}
                                    format={() => `EXP`}
                                />
                            </div>
                        </div>
                        <div className='buttons'>
                            <div className='btn' onClick={onPlay}>Play</div>
                            <div className='btn' onClick={onFeed} style={{marginLeft: '20px'}}>Feed</div>
                        </div>
                    </div>
                    <div className='item img'>
                        <Image style={{width: '240px', height: '240px'}} src={pet.image}/>
                    </div>
                </div>
                <div className='row'>
                    <div className='item section'>
                        <div className='head'>
                            <div className='content'>
                                <FileTextOutlined style={{fontSize: '20px', marginRight: '8px'}}/>
                                Details
                            </div>
                            <div className='divider'/>
                        </div>
                        <div className='main-col'>
                            <div className='attr'>
                                <div className='key'>Master</div>
                                <div className='value master'>
                                    <div className='person'>
                                        <Jazzicon diameter={38} seed={randomJazzicon()}/>
                                        <div>{formatPrincipal(pet.owner[0])}...</div>
                                    </div>
                                    <div>
                                        <HeartFilled style={{fontSize: '24px', color: '#EA580B'}}/>
                                    </div>
                                    <div className='person'>
                                        <Jazzicon diameter={38} seed={randomJazzicon()}/>
                                        <div>{formatPrincipal(pet.owner[1])}...</div>
                                    </div>
                                </div>
                            </div>
                            <div className='attr'>
                                <div className='key'>Adopt Day</div>
                                <div className='value'>{formatDate(pet.birthday)}</div>
                            </div>
                            <div className='attr'>
                                <div className='key'>Birthday</div>
                                <div className='value'>{formatDate(pet.birthday)}</div>
                            </div>
                        </div>
                    </div>
                    <div className='item section'>
                        <div className='head'>
                            <div className='content'>
                                <BookOutlined style={{fontSize: '20px', marginRight: '8px'}}/>
                                Diary
                            </div>
                            <div className='divider'/>
                        </div>
                        <div className='main-col'>
                            <Skeleton height={16}/>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='item section'>
                        <div className='head'>
                            <div className='content'>
                                <OrderedListOutlined style={{fontSize: '20px', marginRight: '8px'}}/>
                                Task
                            </div>
                            <div className='divider'/>
                        </div>
                        <div className='main-col'>
                            <Skeleton height={16}/>
                        </div>
                    </div>
                    <div className='item section'>
                        <div className='head'>
                            <div className='content'>
                                <DropboxOutlined style={{fontSize: '20px', marginRight: '8px'}}/>
                                Bag
                            </div>
                            <div className='divider'/>
                        </div>
                        <div className='main-row'>
                            <div className='tool'>
                                <Skeleton.Avatar size={64} shape='circle'/>
                                <div style={{marginTop: '8px'}}>Dog Food A</div>
                                <div>200g</div>
                            </div>
                            <div className='tool'>
                                <Skeleton.Avatar size={64} shape='circle'/>
                                <div style={{marginTop: '8px'}}>Dog Food B</div>
                                <div>15g</div>
                            </div>
                            <div className='tool'>
                                <Skeleton.Avatar size={64} shape='circle'/>
                                <div style={{marginTop: '8px'}}>Fly Plate</div>
                                <div>one</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PetPage