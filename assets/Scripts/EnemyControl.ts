import { _decorator, Component, Node, resources, SpriteFrame, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyControl')
export class EnemyControl extends Component {
    //是否死亡
    isDie: Boolean = false

    start() {
    }

    update(deltaTime: number) {
        const nodePosition = this.node.getPosition()

        if (!this.isDie) {
            //移動
            this.node.setPosition(nodePosition.x, nodePosition.y - (300 * deltaTime))
        }

        //出畫面自動銷毀
        if (nodePosition.y < -420) {
            this.node.destroy()
        }
    }

    //死亡
    die() {
        this.isDie = true

        /**
         * resources资源的释放
         * 加载resources资源的方法是resources.load，引擎很贴心地返回了SpriteFrame对象
         * resources.load(path + '/spriteFrame', SpriteFrame, (err: any, spFrame: SpriteFrame) => {
                if (!err && spFrame) {
                    spFrame.addRef(); // 计数加1
                    ....
                }
            });
         * https://forum.cocos.org/t/topic/135301
         */
        //加載爆炸圖片
        resources.load('enemy0_die/spriteFrame', SpriteFrame, (err, res) => {
            this.node.getComponent(Sprite).spriteFrame = res
        })

        //300毫秒後銷毀
        setTimeout(() => {
            this.node.destroy()
        }, 300)
    }
}


