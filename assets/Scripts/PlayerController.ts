import { _decorator, Component, Node, EventTouch, v3, Prefab, instantiate, PhysicsSystem2D, Contact2DType, Collider2D, IPhysics2DContact, AssetManager, resources, SpriteFrame, Sprite, Game } from 'cc';
import { EnemyController } from './EnemyController';
import { BulletController } from './BulletController';
import { Gloabl } from './Global';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {

  @property(Prefab)
  bulletPre: Prefab = null

  @property
  died: boolean = false;

  start() {
    Gloabl.getInstance().begin()

    this.node.on(Node.EventType.TOUCH_MOVE, (touch: EventTouch) => {
      if(Gloabl.getInstance().isPause()) {
        Gloabl.getInstance().resume()
      }
      this.node.setWorldPosition(
        v3(touch.getUILocation().x, touch.getUILocation().y)
      );
    });
    this.node.on(Node.EventType.TOUCH_END,() => {
      Gloabl.getInstance().pause();
    })
    // if(this.shot) {
    this.schedule(() => {
      if (!this.died) {
        // 创建子弹
        let bullet = instantiate(this.bulletPre)
        bullet.setParent(this.node.parent)
        bullet.setPosition(this.node.getPosition().x, this.node.getPosition().y + 70)
      }

    }, 0.5);
    // }


  }

  update(deltaTime: number) {

  }

  /**
   * 被撞击
   */
  hit() {
    this.died = true;
    Gloabl.getInstance().over();
    console.log(Gloabl.getInstance())
    resources.load("4/spriteFrame", SpriteFrame, (error: Error, res: SpriteFrame) => {
      this.node.getComponent(Sprite).spriteFrame = res;
      // 300ms后销毁
      setTimeout(() => {
        this.node?.destroy();
      }, 200);
    });
  }
}

