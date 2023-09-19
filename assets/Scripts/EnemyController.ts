import { _decorator, assetManager, AssetManager, Component, error, Node, resources, Sprite, SpriteFrame } from 'cc';
import { EnemyManager } from './EnemyManager';
import { Gloabl } from './Global';
const { ccclass, property } = _decorator;

@ccclass('EnemyController')
export class EnemyController extends Component {

    @property
    died: boolean = false;
    start() {

    }
    update(deltaTime: number) {
        if (!this.died) {
            this.node.setPosition(this.node.getPosition().x, this.node.getPosition().y -= 300 * deltaTime)
        }
        if (this.node.getPosition().y < -1280 || Gloabl.getInstance().isOver()) {
            this.node.destroy()
        }
    }

    hit() {
        this.died = true;
        resources.load("5/spriteFrame", SpriteFrame, (error: Error, res: SpriteFrame) => {
            if(this.node) {
                this.node.getComponent(Sprite).spriteFrame = res;
                // 300ms后销毁
                setTimeout(() => {
                    this.node?.destroy();
                }, 200);
            }
            
        });

    }
}


