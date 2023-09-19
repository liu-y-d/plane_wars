import { _decorator, Collider2D, Contact2DType, IPhysics2DContact, Component, Node } from 'cc';
import { EnemyController } from './EnemyController';
import { BulletController } from './BulletController';
import { BgController } from './BgController';
import { PlayerController } from './PlayerController';
const { ccclass, property } = _decorator;

@ccclass('ContactCallBack')
export class ContactCallBack extends Component {
    start() {
        // 注册单个碰撞体的回调函数
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            // collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
            // collider.on(Contact2DType.PRE_SOLVE, this.onPreSolve, this);
            // collider.on(Contact2DType.POST_SOLVE, this.onPostSolve, this);
        }


    }
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 子弹和敌人碰撞
        if (
            (selfCollider.tag === 0 && otherCollider.tag === 1) ||
            (selfCollider.tag === 1 && otherCollider.tag === 0)
        ) {
            if (selfCollider.getComponent(EnemyController) !== null) {
                selfCollider.getComponent(EnemyController).hit()
            }
            if (otherCollider.getComponent(BulletController) !== null) {
                otherCollider.getComponent(BulletController).hit();
            }

        }

        // 敌人和英雄碰撞
        if (
            (selfCollider.tag === 1 && otherCollider.tag === 2 && selfCollider.getComponent(EnemyController) !== null && !selfCollider.getComponent(EnemyController).died) ||
            (selfCollider.tag === 2 && otherCollider.tag === 1 && otherCollider.getComponent(EnemyController) !== null && !otherCollider.getComponent(EnemyController).died)
        ) {
            if (selfCollider.getComponent(EnemyController) !== null) {
                selfCollider.getComponent(EnemyController).hit()
            }
            if (otherCollider.getComponent(PlayerController) !== null) {
                otherCollider.getComponent(PlayerController).hit();
            }
        }

    }
    // onEndContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
    //     // 只在两个碰撞体结束接触时被调用一次
    //     console.log('onEndContact');
    // }
    // onPreSolve (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
    //     // 每次将要处理碰撞体接触逻辑时被调用
    //     console.log('onPreSolve');
    // }
    // onPostSolve (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
    //     // 每次处理完碰撞体接触逻辑时被调用
    //     console.log('onPostSolve');
    // }
}


