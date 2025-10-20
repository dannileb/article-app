import { AppLink } from '#/shared/ui/AppLink/AppLink';
import { useLocation } from 'react-router';
import classes from './SideBarLink.module.scss';
import { matchPath } from 'react-router';
import { SideBarLinkType } from '../../model/links.types';

interface SideBarLinkProps {
    link: SideBarLinkType;
    collapsed: boolean;
}

export const SideBarLink = ({ link, collapsed }: SideBarLinkProps) => {
    const { pathname } = useLocation();
    return (
        <AppLink
            to={link.to}
            className={classes.link}
            view={matchPath(link.to, pathname) ? 'active' : 'secondary'}
            title={link.text}
        >
            {collapsed ? link.icon : link.text}
        </AppLink>
    );
};
