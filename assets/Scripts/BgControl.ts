import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BgControl')
export class BgControl extends Component {
    start() {
    }

    update(deltaTime: number) {
        for (let bgNode of this.node.children) {
            const yPoint = bgNode.getPosition().y

            bgNode.setPosition(0, yPoint - 300 * deltaTime)

            if (yPoint < -852) {
                bgNode.setPosition(0, 852 * 2)
            }
        }
    }
}


