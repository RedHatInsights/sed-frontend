export const permissions = [
  {
    id: 'connectToInsights',
    name: 'Connect to Red Hat Insights',
    description: 'TODO',
  },
  {
    id: 'useOpenSCAP',
    name: 'Service: Use OpenSCAP for Compliance policies',
    additionalInfo: 'Requires Insights',
    description:
      'This setting installs OpenSCAP for connected systems and ensuresthat systems are using the most current versions of profiles and policies. OpenSCAP is required for systems to use the compliance service.',
    links: [
      {
        name: 'About Insights for RHEL Compliance',
        link:
          'https://access.redhat.com/documentation/en-us/red_hat_insights/2021/html/assessing_and_monitoring_security_policy_compliance_of_rhel_systems/index',
      },
      {
        name: 'View configuration playbook',
        link:
          'https://github.com/RedHatInsights/config-manager/tree/master/playbooks',
      },
    ],
  },
  {
    id: 'enableCloudConnector',
    name: 'Enable Cloud Connector to fix issues directly from Insights',
    description: 'TODO',
  },
];
