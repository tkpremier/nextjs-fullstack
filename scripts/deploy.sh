rsync -avz --delete \
  --exclude '.cursor' \
  --exclude '.vscode' \
  --exclude 'api' \
  --exclude 'client' \
  --exclude 'db-data' \
  --exclude 'deploy.sh' \
  --exclude 'caddy_data' \
  --exclude 'caddy_config' \
  -e "ssh -o IdentitiesOnly=yes -i ~/.ssh/digitalocean" \
  ./ tkpremier@104.131.10.82:/opt/tkpremier/