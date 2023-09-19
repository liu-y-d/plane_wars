import { _decorator, director, Component, Node } from 'cc';
const { ccclass, property } = _decorator;


export class Gloabl {

    private constructor() {
    }
    // private 只允许在类内访问
    private static instance: Gloabl | null
    // 获取单例
    static getInstance():Gloabl{
        debugger
        // 判断系统是否已经有这个单例
        if(!Gloabl.instance) {
            Gloabl.instance = new Gloabl()
        }
        return Gloabl.instance;
    }

    /**
     * 游戏状态 0 未开始 1 开始 2 结束 3 暂停
     */
    private gameStatus: Number = 0;

    
    /**
     * 暂停游戏
     */
    pause() {
        this.gameStatus = 3;
        director.pause();
    }
    isPause() {
        return this.gameStatus == 3;
    }
    /**
     * 恢复游戏
     */
    resume() {
        this.gameStatus = 1;
        director.resume()
    }

    /**
     * 结束
     */
    over() {
        this.gameStatus = 2;
    }
    
    /**
     * 是否结束
     * @returns boolen
     */
    isOver() {
        return this.gameStatus == 2;
    }
    /**
     * 开始
     */
    begin() {
        console.log(123123)
        this.gameStatus = 1;
    }
}

