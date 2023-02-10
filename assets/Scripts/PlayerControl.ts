import { _decorator, Component, Node, Prefab, instantiate, director, Collider2D, Contact2DType, IPhysics2DContact, resources, SpriteFrame, Sprite } from 'cc';
import { EnemyControl } from './EnemyControl';
const { ccclass, property } = _decorator;

@ccclass('PlayerControl')
export class PlayerControl extends Component {
    @property(Prefab)
    bulletPre: Prefab = null 

    start() {
        let collider = this.getComponent(Collider2D)

        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }

        //飛機點擊拖拉移動
        this.node.on(Node.EventType.TOUCH_MOVE, (event) => {
            const xPoint = event.getLocation().x
            const yPoint = event.getLocation().y
            this.node.setPosition(xPoint - 240, yPoint - 400)
        })

        //攻擊 計時器
        this.schedule(() => {
            const bullet = instantiate(this.bulletPre)
            const xPoint = this.node.getPosition().x
            const yPoint = this.node.getPosition().y

            //將子彈加到場景上
            bullet.setParent(director.getScene().getChildByName('Canvas'))

            //設定子彈位置
            bullet.setPosition(xPoint, yPoint + 70)
        }, 1)
    }

    update(deltaTime: number) {
        
    }

    onCollisionEnter(other) {
        //如果被敵機撞到
        if (other.tag === 1) {
            //銷毀敵人
            other.getComponent(EnemyControl).die()

            //加載爆炸圖片
            resources.load('hero1_die/spriteFrame', SpriteFrame, (err, res) => {
                this.node.getComponent(Sprite).spriteFrame = res
            })

            //300毫秒後銷毀
            setTimeout(() => {
                //銷毀自己
                if (this.node) {
                    this.node.destroy()
                }
            }, 300)
        }
    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体开始接触时被调用一次        
        setTimeout(() => {
            this.onCollisionEnter(otherCollider)
        }, 50);
    }
}


