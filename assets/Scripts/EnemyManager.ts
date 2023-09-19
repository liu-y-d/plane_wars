import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
import { PlayerController } from './PlayerController';
import { Gloabl } from './Global';
const { ccclass, property } = _decorator;

@ccclass('EnemyManager')
export class EnemyManager extends Component {

    @property(Prefab)
    enemyPre: Prefab = null;
    
    start() {
        this.schedule(this.createEnemyCallback,2)
    }

    createEnemyCallback() {
        console.log(Gloabl.getInstance().isOver())
        console.log(Gloabl.getInstance())
        if(Gloabl.getInstance().isOver()) {
            this.unschedule(this.createEnemyCallback);
        }
        let enemy = instantiate(this.enemyPre);
        enemy.setParent(this.node);
        enemy.setPosition(Math.random() * 618 - 309,this.node.getPosition().y)
    }


}


