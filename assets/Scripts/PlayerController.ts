import { _decorator, Component, Node, EventTouch, v3, Prefab, instantiate, PhysicsSystem2D, Contact2DType, Collider2D, IPhysics2DContact, AssetManager, resources, SpriteFrame, Sprite } from 'cc';
import { EnemyController } from './EnemyController';
import { BulletController } from './BulletController';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {

  @property(Prefab)
  bulletPre: Prefab = null

  @property
  died: boolean = false;
  // shot: boolean = false

  onLoad() {
    // console.log(PhysicsSystem2D.instance.enable)
    // // 注册全局碰撞回调函数
    // PhysicsSystem2D.instance?.on(
    //   Contact2DType.BEGIN_CONTACT,
    //   this.onBeginContact,
    //   this);
  }
  onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    console.log(1)



  }
  start() {
    this.node.on(Node.EventType.TOUCH_MOVE, (touch: EventTouch) => {
      // this.shot = true;
      this.node.setWorldPosition(
        v3(touch.getUILocation().x, touch.getUILocation().y)
      );
    });
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

  die() {
    this.died = true;
    resources.load("4/spriteFrame", SpriteFrame, (error: Error, res: SpriteFrame) => {
      this.node.getComponent(Sprite).spriteFrame = res;
      // 300ms后销毁
      setTimeout(() => {
        this.node?.destroy();
      }, 200);
    });
  }
}

