import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Services from './Services';
import useFeatureFlag from '../../hooks/useFeatureFlag';
import usePermissions from '../../hooks/usePermissions';

jest.mock('../../hooks/useFeatureFlag', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../hooks/usePermissions', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const fullPermissions = {
  canReadConfigManagerProfile: true,
  canWriteConfigManagerProfile: true,
  canReadInventoryHosts: true,
  canWriteInventoryHosts: true,
};

const readOnlyPermissions = {
  canReadConfigManagerProfile: true,
  canWriteConfigManagerProfile: false,
  canReadInventoryHosts: true,
  canWriteInventoryHosts: false,
};

const selectedToggleDefaults = {
  enabled: { remediations: true },
  disabled: { remediations: false },
};

const getToggleButton = (label) => {
  const button = screen.getByText(label).closest('button');
  expect(button).toBeTruthy();
  return button;
};

const isDisabled = (button) =>
  button.hasAttribute('disabled') ||
  button.getAttribute('aria-disabled') === 'true';

const renderServices = ({
  permissions = fullPermissions,
  selectedToggle = 'enabled',
  isLoading = false,
} = {}) => {
  const onChange = jest.fn();
  const setConfirmChangesOpen = jest.fn();

  usePermissions.mockReturnValue({
    permissions,
    isLoading: false,
  });

  render(
    <Services
      defaults={selectedToggleDefaults[selectedToggle]}
      onChange={onChange}
      setConfirmChangesOpen={setConfirmChangesOpen}
      isLoading={isLoading}
    />
  );

  return { onChange, setConfirmChangesOpen };
};

describe('Services', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    useFeatureFlag.mockReturnValue(false);
  });

  it('read-only user, Disabled-button selected -> Enabled-button should be disabled', () => {
    const { onChange, setConfirmChangesOpen } = renderServices({
      permissions: readOnlyPermissions,
      selectedToggle: 'disabled',
    });

    const enabledButton = getToggleButton('Enabled');
    expect(isDisabled(enabledButton)).toBe(true);

    fireEvent.click(enabledButton);

    expect(onChange).not.toHaveBeenCalled();
    expect(setConfirmChangesOpen).not.toHaveBeenCalled();
  });

  it('read-only user, Enabled-button selected -> Disabled-button should be disabled', () => {
    const { onChange, setConfirmChangesOpen } = renderServices({
      permissions: readOnlyPermissions,
      selectedToggle: 'enabled',
    });

    const disabledButton = getToggleButton('Disabled');
    expect(isDisabled(disabledButton)).toBe(true);

    fireEvent.click(disabledButton);

    expect(onChange).not.toHaveBeenCalled();
    expect(setConfirmChangesOpen).not.toHaveBeenCalled();
  });

  it('user with all required perms, Disabled-button selected -> Enabled-button should be clickable', () => {
    const { onChange, setConfirmChangesOpen } = renderServices({
      permissions: fullPermissions,
      selectedToggle: 'disabled',
    });

    const enabledButton = getToggleButton('Enabled');
    expect(isDisabled(enabledButton)).toBe(false);

    fireEvent.click(enabledButton);

    expect(onChange).toHaveBeenCalledWith({ remediations: true });
    expect(setConfirmChangesOpen).toHaveBeenCalledWith(true);
  });

  it('user with all required permissions, Enabled-button selected -> Disabled-button should be clickable', () => {
    const { onChange, setConfirmChangesOpen } = renderServices({
      permissions: fullPermissions,
      selectedToggle: 'enabled',
    });

    const disabledButton = getToggleButton('Disabled');
    expect(isDisabled(disabledButton)).toBe(false);

    fireEvent.click(disabledButton);

    expect(onChange).toHaveBeenCalledWith({ remediations: false });
    expect(setConfirmChangesOpen).toHaveBeenCalledWith(true);
  });
});
