# Potluck-Planner

Steps to run :
docker compose up
cd backend
pnpm install
pnpm migration:freshSeed

-----------------------------------------------------------
if pip -r requirement / flask error while docker compose up
sudo systemctl restart docker

-------------------------------------------------------------------
Run locally

1. cd backend
2. pnpm install
3. pnpm dev
4. docker compose up postgres
5. pnpm migration:freshSeed
6. docker compose up microservice
7. docker compose up microservice_maps
8. cd fronted
9. pnpm install
10. pnpm devgit 
