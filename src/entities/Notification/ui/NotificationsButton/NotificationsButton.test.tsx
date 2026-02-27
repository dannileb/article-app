import { screen, fireEvent, act } from '@testing-library/react';
import { NotificationsButton } from './NotificationsButton';
import { renderWithProviders } from '#/shared/lib/tests/renderWithTranslation';
import { notificationApi } from '../../api/notificationApi';
import { mockNotifications } from '../../consts/mocks';
import { notificationReducer } from '../../model/slice/notificationSlice';

const LAST_SEEN_TIMESTAMP = Date.now() - 500;

describe('NotificationsButton.test', () => {
    const setup = async (lastSeen = 0) => {
        await act(async () => {
            renderWithProviders(<NotificationsButton />, {
                reduxProps: {
                    initialState: {
                        notification: {
                            lastSeen,
                        },
                    },
                    asyncReducers: {
                        notification: notificationReducer,
                    },
                    rtkqMocks: [
                        {
                            api: notificationApi,
                            endpoint: 'getNotifications',
                            args: undefined,
                            data: mockNotifications,
                        },
                    ],
                },
            });
        });
    };

    it('should render', async () => {
        await setup(LAST_SEEN_TIMESTAMP);
        expect(
            screen.getByTestId('NotificationsButton.OpenButton'),
        ).toBeInTheDocument();
    });
    it('should reset new notifs count after click', async () => {
        await setup(LAST_SEEN_TIMESTAMP);

        expect(
            screen.getByTestId('NotificationsButton.OpenButton'),
        ).toHaveTextContent('1');

        await act(async () => {
            fireEvent.click(
                screen.getByTestId('NotificationsButton.OpenButton'),
            );
        });

        expect(
            screen.getByTestId('NotificationsButton.OpenButton'),
        ).toHaveTextContent('');
    });

    it('show notifs count', async () => {
        await setup(LAST_SEEN_TIMESTAMP);
        expect(
            screen.getByTestId('NotificationsButton.OpenButton'),
        ).toHaveTextContent('1');
    });
});
