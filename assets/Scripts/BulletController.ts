import { _decorator, BoxCollider2D, Collider, Collider2D, Component, Node, Contact2DType } from 'cc';
import { EnemyController } from './EnemyController';
const { ccclass, property } = _decorator;

@ccclass('BulletController')
export class BulletController extends Component {

    @property
    speed: number = 800;

    
    start() {
        // let collider = this.node.getComponent(BoxCollider2D);
        // collider.on(Contact2DType.BEGIN_CONTACT, this.onCollisionEnter, this);
    }

    update(deltaTime: number) {
        this.node.setPosition(this.node.getPosition().x, this.node.getPosition().y += this.speed * deltaTime);
        if(this.node.getPosition().y > 640) {
            this.node.destroy()
        }
    }

    hit() {
        this.node.destroy()
    }
    
}


