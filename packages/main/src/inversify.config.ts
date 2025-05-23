import DownloadController from "./controller/DownloadController.ts";
import HomeController from "./controller/HomeController.ts";
import WebviewController from "./controller/WebviewController.ts";
import { Container } from "inversify";
import {
  FavoriteRepository,
  VideoRepository,
  ConversionRepository,
  TaskQueueService,
  DownloaderService,
} from "@mediago/shared/node";
import WebviewService from "./services/WebviewService.ts";
import ElectronApp from "./app.ts";
import { Controller } from "@mediago/shared/common";
import { TYPES } from "@mediago/shared/node";
import MainWindow from "./windows/MainWindow.ts";
import BrowserWindow from "./windows/BrowserWindow.ts";
import { SniffingHelper } from "./services/SniffingHelperService.ts";
import ElectronLogger from "./vendor/ElectronLogger.ts";
import ElectronUpdater from "./vendor/ElectronUpdater.ts";
import ElectronDevtools from "./vendor/ElectronDevtools.ts";
import ElectronStore from "./vendor/ElectronStore.ts";
import IpcHandler from "./core/ipc.ts";
import ProtocolService from "./core/protocol.ts";
import ConversionController from "./controller/ConversionController.ts";
import { VideoService } from "./services/VideoService.ts";
import PlayerWindow from "./windows/PlayerWindow.ts";
import PlayerController from "./controller/PlayerController.ts";
import { TypeORM } from "@mediago/shared/node";

const container = new Container({
  skipBaseClassChecks: true,
  defaultScope: "Singleton",
  autoBindInjectable: true,
});

container.bind<ElectronApp>(TYPES.ElectronApp).to(ElectronApp);

// services
container.bind<WebviewService>(TYPES.WebviewService).to(WebviewService);
container.bind<TaskQueueService>(TYPES.TaskQueueService).to(TaskQueueService);
container
  .bind<DownloaderService>(TYPES.DownloaderService)
  .to(DownloaderService);
container.bind<SniffingHelper>(TYPES.SniffingHelper).to(SniffingHelper);
container.bind<VideoService>(TYPES.VideoService).to(VideoService);

// windows
container.bind<MainWindow>(TYPES.MainWindow).to(MainWindow);
container.bind<BrowserWindow>(TYPES.BrowserWindow).to(BrowserWindow);
container.bind<PlayerWindow>(TYPES.PlayerWindow).to(PlayerWindow);

// controller
container.bind<Controller>(TYPES.Controller).to(HomeController);
container.bind<Controller>(TYPES.Controller).to(WebviewController);
container.bind<Controller>(TYPES.Controller).to(DownloadController);
container.bind<Controller>(TYPES.Controller).to(ConversionController);
container.bind<Controller>(TYPES.Controller).to(PlayerController);

// repository
container.bind<VideoRepository>(TYPES.VideoRepository).to(VideoRepository);
container
  .bind<FavoriteRepository>(TYPES.FavoriteRepository)
  .to(FavoriteRepository);
container
  .bind<ConversionRepository>(TYPES.ConversionRepository)
  .to(ConversionRepository);

// vendor
container.bind<ElectronDevtools>(TYPES.ElectronDevtools).to(ElectronDevtools);
container.bind<TypeORM>(TYPES.TypeORM).to(TypeORM);
container.bind<ElectronUpdater>(TYPES.ElectronUpdater).to(ElectronUpdater);
container.bind<ElectronLogger>(TYPES.ElectronLogger).to(ElectronLogger);
container.bind<ElectronStore>(TYPES.ElectronStore).to(ElectronStore);

// core
container.bind<ProtocolService>(TYPES.ProtocolService).to(ProtocolService);
container.bind<IpcHandler>(TYPES.IpcHandlerService).to(IpcHandler);

export { container };
