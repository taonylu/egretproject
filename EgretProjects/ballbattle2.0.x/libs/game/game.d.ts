/**
*  文 件 名：LoadManager.ts
*  功    能： 加载类
*  内    容： 自定义加载类，方便添加回调函数，减少代码书写
*  作    者： 羊力大仙
*  生成日期：2015/9/10
*  修改日期：2015/9/10
*  修改日志：
*/
/**资源加载类*/
declare class LoadManager {
    /**实例*/
    private static instance;
    /**加载完成回调*/
    private loadComplete;
    /**加载错误回调*/
    private loadError;
    /**加载进度回调*/
    private loadProgress;
    /**回调函数绑定的对象*/
    private thisObject;
    constructor();
    static getInstance(): LoadManager;
    /**
     * 加载资源组
     * @param name 资源组名
     * @param thisObject 回调函数绑定的对象
     * @param loadComplete 加载完成回调函数
     * @param loadError 加载错误回调函数
     * @param loadProgress 加载进度回调函数
     */
    loadGroup(name: string, thisObject: any, loadComplete?: Function, loadProgress?: Function, loadError?: Function): void;
    /**资源组加载完成*/
    private onResourceLoadComplete(event);
    /**资源组加载错误*/
    private onResourceLoadError(event);
    /**资源组加载进度*/
    private onResourceProgress(event);
    /**清除指定资源组的回调函数*/
    private clearCallBack(name);
}

/**
*  文 件 名：ObjectPool.ts
*  功    能： 对象池类
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/10
*  修改日期：2015/9/10
*  修改日志：
*/
/**对象池*/
declare class ObjectPool {
    /**存储对象池的Object*/
    private static pool;
    /**存储对象的数组*/
    private list;
    /**对象类型*/
    private className;
    constructor(className: string);
    /**获取对象*/
    getObject(): any;
    /**回收对象*/
    returnObject(value: any): void;
    /**
     * 获取对象池，如果不存在则新建一个
     * @param className 对象类名
     * @param initNum 初始化对象池数量
     */
    static getPool(className: string, initNum?: number): ObjectPool;
}

/**
*  文 件 名：ArrayTool.ts
*  功    能：数组工具类
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/10
*  修改日期：2015/9/10
*  修改日志：
*/
declare class ArrayTool {
    /**选择法随机排序数组*/
    static randomArr(arr: Array<any>): void;
    /**浅复制二维数组*/
    static copy2DArr(arr: Array<any>): Array<any>;
    /**获取Object的长度*/
    static getObjectLen(obj: Object): number;
}

/**
*  文 件 名：LayerManager.ts
*  功    能： 图层管理类
*  内    容： 游戏图层、场景管理
*  作    者： 羊力大仙
*  生成日期：2015/9/10
*  修改日期：2015/9/10
*  修改日志：
*/
declare class LayerManager {
    /**单例*/
    private static instance;
    /**Stage*/
    stage: egret.Stage;
    /**UIStage*/
    uiStage: egret.gui.UIStage;
    /**Main*/
    main: egret.DisplayObjectContainer;
    /**UIStage场景层*/
    uiSceneLayer: egret.gui.Group;
    /**UIStage弹框层*/
    uiPopLayer: egret.gui.Group;
    /**当前场景*/
    private curScene;
    /**场景动画时间*/
    private tweenTime;
    static getInstance(): LayerManager;
    /**初始化*/
    initialize(main: egret.DisplayObjectContainer): void;
    /**
     * 运行场景
     * @param 运行的场景名
     * @param 切换场景过渡动画类型
     * @param 是否销毁上一场景
     */
    runScene(nextScene: BaseScene, tween?: STween, destroy?: boolean): void;
    /**场景过渡动画*/
    private playSceneTween(curScene, nextScene, tween);
}
/**场景过渡动画*/
declare enum STween {
    None = 0,
    /**新场景从右边入场*/
    R = 1,
}

/**
*  文 件 名：StringTool.ts
*  功    能： 字符串工具类
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/15
*  修改日期：2015/9/15
*  修改日志：
*/
declare class StringTool {
    /**
    * 中英文混合字符串转换成包含unicode码的字符串
    * "abc一二三123" -> "abc\u4e00\u4e8c\u4e09123\u554a\u554a\u554a123"
    */
    static mixToUnicode(str: string): string;
    /**
     *中英文混合unicode转换成含中文的字符串
     * abc\u4e00\u4e8c\u4e09123\u554a\u554a\u554a123 ->abc一二三123
     */
    static mixUnicodeToCh(str: string): string;
}

/**
*  文 件 名：NumberTool.ts
*  功    能：数字工具类
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/17
*  修改日期：2015/9/17
*  修改日志：
*/
declare class NumberTool {
    /**
     * 获取随机数,(1,3) 返回1 2 3
     */
    static getRandomInt(start: number, end: number): number;
}

/**
*  文 件 名：BaseScene.ts
*  功    能： 场景基类
*  内    容： 将场景自适应到容器的100%
*  作    者： 羊力大仙
*  生成日期：2015/9/10
*  修改日期：2015/9/10
*  修改日志：
*/
declare class BaseScene extends egret.gui.SkinnableComponent {
    constructor();
    /**组建创建完毕的情况下，添加到舞台时执行*/
    onEnable(): void;
    /**移除界面时执行*/
    onRemove(): void;
    /**销毁界面时执行*/
    onDestroy(): void;
}

/**
*  文 件 名：ClientSocket.ts
*  功    能：Socket基类
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/22
*  修改日期：2015/9/22
*  修改日志：
*/
declare class ClientSocket {
    private static instance;
    webSocket: egret.WebSocket;
    private socketHand;
    private dataBuffer;
    IP: string;
    port: number;
    isConnecting: boolean;
    private timer;
    static getInstance(): ClientSocket;
    connect(): void;
    private onSocketConnect();
    private onSocketData();
    private onSocketError();
    private onSocketClose();
    send(json: any): void;
    close(): void;
    setSocketHand(socketHand: ISocketHand): void;
    private startTimer();
    private stopTimer();
    private onTimerComplete();
}

/**
*  文 件 名：ISocketHand.ts
*  功    能：socket处理类接口
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/23
*  修改日期：2015/9/23
*  修改日志：
*/
interface ISocketHand {
    onSocketConnect(): void;
    onSocketData(json: any): void;
    onSocketError(): void;
    onSocketClose(): void;
    onSocketConnectTimeOver(): void;
}

declare module puremvc
{
	export interface ICommand
		extends INotifier
	{
		execute( notification:INotification ):void;
	}

	export interface IController
	{
		executeCommand( notification:INotification ):void;
		registerCommand( notificationName:string, commandClassRef:Function ):void;
		hasCommand( notificationName:string ):boolean;
		removeCommand( notificationName:string ):void;
	}

	export interface IFacade
		extends INotifier
	{
		registerCommand( notificationName:string, commandClassRef:Function ):void;
		removeCommand( notificationName:string ): void;
		hasCommand( notificationName:string ):boolean;
		registerProxy( proxy:IProxy ):void;
		retrieveProxy( proxyName:string ):IProxy;
		removeProxy( proxyName:string ):IProxy;
		hasProxy( proxyName:string ):boolean;
		registerMediator( mediator:IMediator ):void;
		retrieveMediator( mediatorName:string ):IMediator;
		removeMediator( mediatorName:string ):IMediator;
		hasMediator( mediatorName:string ):boolean;
		notifyObservers( notification:INotification ):void;
	}

	export interface IMediator
		extends INotifier
	{
		getMediatorName():string;
		getViewComponent():any;
		setViewComponent( viewComponent:any ):void;
		listNotificationInterests( ):string[];
		handleNotification( notification:INotification ):void;
		onRegister():void;
		onRemove():void;
	}

	export interface IModel
	{
		registerProxy( proxy:IProxy ):void;
		removeProxy( proxyName:string ):IProxy;
		retrieveProxy( proxyName:string ):IProxy;
		hasProxy( proxyName:string ):boolean;
	}

	export interface INotification
	{
		getName():string;
		setBody( body:any ):void;
		getBody():any;
		setType( type:string ):void;
		getType():string;
		toString():string;
	}

	export interface INotifier
	{
		sendNotification( name:string, body?:any, type?:string ):void;
	}

	export interface IObserver
	{
		setNotifyMethod( notifyMethod:Function ):void;
		setNotifyContext( notifyContext:any ):void;
		notifyObserver( notification:INotification ):void;
		compareNotifyContext( object:any ):boolean;
	}

	export interface IProxy
		extends INotifier
	{
		getProxyName():string;
		setData( data:any ):void;
		getData():any;
		onRegister( ):void;
		onRemove( ):void;
	}

	export interface IView
	{
		registerObserver( notificationName:string, observer:IObserver ):void;
		removeObserver( notificationName:string, notifyContext:any ):void;
		notifyObservers( notification:INotification ):void;
		registerMediator( mediator:IMediator ):void;
		retrieveMediator( mediatorName:string ):IMediator;
		removeMediator( mediatorName:string ):IMediator;
		hasMediator( mediatorName:string ):boolean;
	}

    export class Observer
		implements IObserver
	{
        public notify: Function;
        public context: any;
        constructor (notifyMethod: Function, notifyContext: any);
        private getNotifyMethod(): Function;
        public setNotifyMethod(notifyMethod: Function): void;
        private getNotifyContext(): any;
        public setNotifyContext(notifyContext: any): void;
        public notifyObserver(notification: INotification): void;
        public compareNotifyContext(object: any): boolean;
    }
	
	export class View
		implements IView
	{
        public mediatorMap: Object;
        public observerMap: Object;
        constructor ();
        public initializeView(): void;
        public registerObserver(notificationName: string, observer: IObserver): void;
        public removeObserver(notificationName: string, notifyContext: any): void;
        public notifyObservers(notification: INotification): void;
        public registerMediator(mediator: IMediator): void;
        public retrieveMediator(mediatorName: string): IMediator;
        public removeMediator(mediatorName: string): IMediator;
        public hasMediator(mediatorName: string): boolean;
        static SINGLETON_MSG: string;
        static instance: IView;
        static getInstance(): IView;
    }


    export class Controller
		implements IController
	{
        public view: IView;
        public commandMap: Object;
        constructor ();
        public initializeController(): void;
        public executeCommand(notification: INotification): void;
        public registerCommand(notificationName: string, commandClassRef: Function): void;
        public hasCommand(notificationName: string): boolean;
        public removeCommand(notificationName: string): void;
        static instance: IController;
        static SINGLETON_MSG: string;
        static getInstance(): IController;
    }

    export class Model
		implements IModel
	{
        public proxyMap: Object;
        constructor ();
        public initializeModel(): void;
        public registerProxy(proxy: IProxy): void;
        public removeProxy(proxyName: string): IProxy;
        public retrieveProxy(proxyName: string): IProxy;
        public hasProxy(proxyName: string): boolean;
        static SINGLETON_MSG: string;
        static instance: IModel;
        static getInstance(): IModel;
    }

    export class Notification
		implements INotification
	{
        public name: string;
        public body: any;
        public type: string;
        constructor (name: string, body?: any, type?: string);
        public getName(): string;
        public setBody(body: any): void;
        public getBody(): any;
        public setType(type: string): void;
        public getType(): string;
        public toString(): string;
    }

    export class Facade
		implements IFacade
	{
        public model: IModel;
        public view: IView;
        public controller: IController;
        constructor ();
        public initializeFacade(): void;
        public initializeModel(): void;
        public initializeController(): void;
        public initializeView(): void;
        public registerCommand(notificationName: string, commandClassRef: Function): void;
        public removeCommand(notificationName: string): void;
        public hasCommand(notificationName: string): boolean;
        public registerProxy(proxy: IProxy): void;
        public retrieveProxy(proxyName: string): IProxy;
        public removeProxy(proxyName: string): IProxy;
        public hasProxy(proxyName: string): boolean;
        public registerMediator(mediator: IMediator): void;
        public retrieveMediator(mediatorName: string): IMediator;
        public removeMediator(mediatorName: string): IMediator;
        public hasMediator(mediatorName: string): boolean;
        public notifyObservers(notification: INotification): void;
        public sendNotification(name: string, body?: any, type?: string): void;
        static SINGLETON_MSG: string;
        static instance: IFacade;
        static getInstance(): IFacade;
    }

    export class Notifier
		implements INotifier
	{
        public facade: IFacade;
        constructor ();
        public sendNotification(name: string, body?: any, type?: string): void;
    }

    export class MacroCommand
		extends Notifier
		implements ICommand, INotifier
	{
        public subCommands: Function[];
        constructor ();
        public initializeMacroCommand(): void;
        public addSubCommand(commandClassRef: Function): void;
        public execute(notification: INotification): void;
    }

    export class SimpleCommand
		extends Notifier
		implements ICommand, INotifier
	{
        public execute(notification: INotification): void;
    }

    export class Mediator
		extends Notifier
		implements IMediator, INotifier
	{
        public mediatorName: string;
        public viewComponent: any;
        constructor (mediatorName?: string, viewComponent?: any);
        public getMediatorName(): string;
        public getViewComponent(): any;
        public setViewComponent(viewComponent: any): void;
        public listNotificationInterests(): string[];
        public handleNotification(notification: INotification): void;
        public onRegister(): void;
        public onRemove(): void;
        static NAME: string;
    }

    export class Proxy
		extends Notifier
		implements IProxy, INotifier
	{
        public proxyName: string;
        public data: any;
        constructor (proxyName?: string, data?: any);
        public getProxyName(): string;
        public setData(data: any): void;
        public getData(): any;
        public onRegister(): void;
        public onRemove(): void;
        static NAME: string;
    }
}

