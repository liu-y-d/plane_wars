import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BgController')
export class BgController extends Component {
    start() {

    }

    update(deltaTime: number) {
        // 移动地图
        for (let bgItem of this.node.children) {
            bgItem.setPosition(
              bgItem.getPosition().x,
              bgItem.getPosition().y - 150 * deltaTime
            );
            if (bgItem.getPosition().y < 0) {
              bgItem.setPosition(
                bgItem.getPosition().x,
                bgItem.getPosition().y + 1280 * 2
              );
            }
          }
    }
}

