import { DropdownDirection } from '#/shared/ui/Popups/types/Popups.types';
import cls from './popup.module.scss';

export const mapDirectionClass: Record<DropdownDirection, string> = {
    bottomLeft: cls.optionsBottomLeft,
    bottomRight: cls.optionsBottomRight,
    topRight: cls.optionsTopRight,
    topLeft: cls.optionsTopLeft,
};
