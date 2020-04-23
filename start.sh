echo "Stopping server..."
sudo systemctl stop food-server
sudo systemctl --no-pager status food-server
echo "Restarting server..."
sudo systemctl enable food-server
sudo systemctl start food-server
sudo systemctl --no-pager status food-server
