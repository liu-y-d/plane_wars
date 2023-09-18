import { _decorator, Component, Node, EventTouch, v3} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    start() {
        this.node.on(Node.EventType.TOUCH_MOVE, (touch: EventTouch) => {
            this.node.setWorldPosition(
              v3(touch.getUILocation().x, touch.getUILocation().y)
            );
          });
    }

    update(deltaTime: number) {
        
    }
}

