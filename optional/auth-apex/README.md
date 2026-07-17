# Optional: Experience Cloud auth Apex

These classes came from the Salesforce React B2X template (login, register, password flows).

They are **not** required for the public CV sample and are **not** deployed with the default guide.

## Do not deploy unless you mean it

Deploying them exposes Apex REST auth endpoints. On a public Experience Cloud site you must:

1. Keep self registration off unless you intentionally want it
2. Lock down the Guest User profile (no unnecessary Apex / object access)
3. Test abuse cases (open registration, password reset flooding)

For a static hosted CV, leave this folder alone.
