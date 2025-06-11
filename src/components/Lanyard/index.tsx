"use client";
import { lazy } from "react";

// Используем lazy для асинхронной загрузки компонента
const LanyardComponent = lazy(() => import('./Lanyard'));

export default LanyardComponent;