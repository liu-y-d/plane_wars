import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
import { PlayerController } from './PlayerController';
const { ccclass, property } = _decorator;

@ccclass('EnemyManager')
export class EnemyManager extends Component {

    @property(Prefab)
    enemyPre: Prefab = null;
    
    // 声明 Player 属性
    @property({ type: Node })
    private player: Node = null;

    start() {
        this.schedule(this.createEnemyCallback,2)
    }

    createEnemyCallback() {
        console.log(this.player.isValid)
        if(!this.player.isValid) {
            this.unschedule(this.createEnemyCallback);
        }
        let enemy = instantiate(this.enemyPre);
        enemy.setParent(this.node.parent);
        enemy.setPosition(Math.random() * 618 - 309,this.node.getPosition().y)
    }


}


