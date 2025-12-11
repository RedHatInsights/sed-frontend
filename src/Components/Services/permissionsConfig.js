export const permissions = [
  {
    id: 'remediations',
    name: 'Allow permitted Insights users to execute remediation playbooks on rhc-connected systems',
    nameLigthspeed:
      'Allow permitted Red Hat Lightspeed users to execute remediation playbooks on rhc-connected systems',
    description:
      'Users with Remediations administrator access can execute Ansible Playbooks on rhc-connected systems in inventory.\nNOTE: This setting does not enable remote playbook remediations on Satellite-managed content hosts. ',
    links: [
      {
        name: 'About Remote host configuration and management',
        link: 'https://docs.redhat.com/en/documentation/red_hat_lightspeed/1-latest/html/remote_host_configuration_and_management/index',
      },
      {
        name: 'About Enabling remote playbook remediations for Satellite-managed content hosts',
        link: 'https://docs.redhat.com/en/documentation/red_hat_lightspeed/1-latest/html/red_hat_lightspeed_remediations_guide/index',
      },
    ],
  },
];
