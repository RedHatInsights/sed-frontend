#!/bin/bash

# Keep the legacy Jenkins entrypoint harmless during frontend decommissioning.
echo "RHC Manager frontend builds and deployments are disabled (RHINENG-30298)."
exit 0
